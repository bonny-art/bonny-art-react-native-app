import type { ReactNode } from "react";

export type MaybePromise<T> = T | Promise<T>;

export type FormikErrors<Values> = Partial<Record<keyof Values, string>>;

export type FormikTouched<Values> = Partial<Record<keyof Values, boolean>>;

export type FormikState<Values> = {
  values: Values;
  errors: FormikErrors<Values>;
  touched: FormikTouched<Values>;
  isSubmitting: boolean;
};

export type FormikComputedProps = {
  isValid: boolean;
  dirty: boolean;
};

export type FormikHelpers<Values> = {
  setFieldValue: <Field extends keyof Values>(
    field: Field,
    value: Values[Field],
    shouldValidate?: boolean
  ) => void;
  setFieldTouched: <Field extends keyof Values>(
    field: Field,
    touched?: boolean,
    shouldValidate?: boolean
  ) => void;
  setFieldError: <Field extends keyof Values>(
    field: Field,
    message?: string
  ) => void;
  resetForm: (
    nextState?: Partial<FormikState<Values>> & { values?: Values }
  ) => void;
  setErrors: (errors: FormikErrors<Values>) => void;
  setSubmitting: (isSubmitting: boolean) => void;
};

export type FormikHandlers<Values> = {
  handleChange: <Field extends keyof Values>(
    field: Field
  ) => (value: Values[Field]) => void;
  handleBlur: <Field extends keyof Values>(field: Field) => () => void;
  handleSubmit: () => void;
  submitForm: () => void;
  validateForm: () => FormikErrors<Values>;
};

export type FormikProps<Values> = FormikState<Values> &
  FormikHelpers<Values> &
  FormikHandlers<Values> &
  FormikComputedProps;

export type FormikConfig<Values> = {
  initialValues: Values;
  onSubmit: (
    values: Values,
    formikHelpers: FormikHelpers<Values>
  ) => MaybePromise<void>;
  validate?: (values: Values) => FormikErrors<Values>;
  validateOnBlur?: boolean;
  validateOnChange?: boolean;
  validateOnMount?: boolean;
  enableReinitialize?: boolean;
  children: (props: FormikProps<Values>) => ReactNode;
};
