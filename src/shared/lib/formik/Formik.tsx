import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type {
  FormikConfig,
  FormikErrors,
  FormikHelpers,
  FormikProps,
  FormikState,
  FormikTouched,
} from "./types";

const isEqual = (a: unknown, b: unknown) => {
  try {
    return JSON.stringify(a) === JSON.stringify(b);
  } catch (error) {
    console.warn("Formik: failed to compare values", error);
    return false;
  }
};

const hasErrors = <Values,>(errors: FormikErrors<Values>): boolean =>
  Object.values(errors).some(Boolean);

export function Formik<Values>(config: FormikConfig<Values>) {
  const {
    initialValues,
    onSubmit,
    validate,
    validateOnBlur = true,
    validateOnChange = true,
    validateOnMount = false,
    enableReinitialize = false,
    children,
  } = config;

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FormikErrors<Values>>({});
  const [touched, setTouched] = useState<FormikTouched<Values>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const valuesRef = useRef(values);
  const initialValuesRef = useRef(initialValues);

  useEffect(() => {
    valuesRef.current = values;
  }, [values]);

  useEffect(() => {
    if (
      enableReinitialize &&
      !isEqual(initialValuesRef.current, initialValues)
    ) {
      initialValuesRef.current = initialValues;
      setValues(initialValues);
      setErrors({});
      setTouched({});
    }
  }, [enableReinitialize, initialValues]);

  const runValidate = useCallback(
    (nextValues: Values) => {
      if (!validate) return {} as FormikErrors<Values>;
      const validationResult = validate(nextValues) ?? {};
      setErrors(validationResult);
      return validationResult;
    },
    [validate]
  );

  useEffect(() => {
    if (validateOnMount) {
      runValidate(initialValuesRef.current);
    }
  }, [runValidate, validateOnMount]);

  const touchAllFields = useCallback(() => {
    setTouched((prev) => {
      const draft: FormikTouched<Values> = { ...prev };
      Object.keys(valuesRef.current).forEach((key) => {
        draft[key as keyof Values] = true;
      });
      return draft;
    });
  }, []);

  const setFieldValue = useCallback(
    <Field extends keyof Values>(
      field: Field,
      value: Values[Field],
      shouldValidate: boolean = true
    ) => {
      setValues((prev) => {
        const next = { ...prev, [field]: value };
        if (shouldValidate && validateOnChange) {
          runValidate(next);
        } else if (shouldValidate) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: undefined,
          }));
        }
        return next;
      });
    },
    [runValidate, validateOnChange]
  );

  const setFieldTouched = useCallback(
    <Field extends keyof Values>(
      field: Field,
      touchedValue: boolean = true,
      shouldValidate: boolean = true
    ) => {
      setTouched((prev) => ({
        ...prev,
        [field]: touchedValue,
      }));

      if (shouldValidate && touchedValue && validateOnBlur) {
        runValidate(valuesRef.current);
      } else if (shouldValidate) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [field]: undefined,
        }));
      }
    },
    [runValidate, validateOnBlur]
  );

  const setFieldError = useCallback(
    <Field extends keyof Values>(field: Field, message?: string) => {
      setErrors((prev) => ({
        ...prev,
        [field]: message,
      }));
    },
    []
  );

  const resetForm = useCallback(
    (nextState?: Partial<FormikState<Values>> & { values?: Values }) => {
      const baseValues = nextState?.values ?? initialValuesRef.current;
      if (nextState?.values) {
        initialValuesRef.current = nextState.values;
      }
      setValues(baseValues);
      setErrors(nextState?.errors ?? {});
      setTouched(nextState?.touched ?? {});
      setIsSubmitting(nextState?.isSubmitting ?? false);
    },
    []
  );

  const handleChange = useCallback(
    <Field extends keyof Values>(field: Field) => {
      return (value: Values[Field]) => {
        setFieldValue(field, value);
      };
    },
    [setFieldValue]
  );

  const handleBlur = useCallback(
    <Field extends keyof Values>(field: Field) => {
      return () => {
        setFieldTouched(field, true);
      };
    },
    [setFieldTouched]
  );

  const validateForm = useCallback(
    () => runValidate(valuesRef.current),
    [runValidate]
  );

  const helpersRef = useRef<FormikHelpers<Values>>();

  const ensureHelpers = useCallback(() => {
    if (!helpersRef.current) {
      helpersRef.current = {
        setFieldValue,
        setFieldTouched,
        setFieldError,
        resetForm,
        setErrors,
        setSubmitting: setIsSubmitting,
      };
    }
    return helpersRef.current;
  }, [resetForm, setFieldError, setFieldTouched, setFieldValue]);

  const handleSubmit = useCallback(async () => {
    const validationErrors = validateForm();
    if (hasErrors(validationErrors)) {
      touchAllFields();
      return;
    }

    setIsSubmitting(true);
    const helpers = ensureHelpers();
    try {
      await Promise.resolve(onSubmit(valuesRef.current, helpers));
    } catch (error) {
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }, [ensureHelpers, onSubmit, touchAllFields, validateForm]);

  const isValid = useMemo(() => !hasErrors(errors), [errors]);

  const dirty = useMemo(
    () => !isEqual(values, initialValuesRef.current),
    [values]
  );

  const formikBag: FormikProps<Values> = useMemo(
    () => ({
      values,
      errors,
      touched,
      isSubmitting,
      isValid,
      dirty,
      handleChange,
      handleBlur,
      handleSubmit,
      submitForm: handleSubmit,
      validateForm,
      setFieldValue,
      setFieldTouched,
      setFieldError,
      resetForm,
      setErrors,
      setSubmitting: setIsSubmitting,
    }),
    [
      dirty,
      errors,
      handleBlur,
      handleChange,
      handleSubmit,
      isSubmitting,
      isValid,
      resetForm,
      setFieldError,
      setFieldTouched,
      setFieldValue,
      touched,
      validateForm,
      values,
    ]
  );

  return children(formikBag);
}

export type { FormikConfig, FormikErrors, FormikHelpers, FormikProps };
