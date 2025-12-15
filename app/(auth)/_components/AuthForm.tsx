// components/auth/AuthForm.tsx
"use client";

import { Controller, DefaultValues, FieldValues, Path, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AnyObjectSchema } from "yup";

import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { useEffect } from "react";

interface FieldConfig<T extends FieldValues> {
  name: Path<T>; // ✅ use Path<T> directly
  label: string;
  type: string;
  placeholder?: string;
}

interface AuthFormProps<T extends FieldValues> {
  schema: AnyObjectSchema;
  defaultValues: DefaultValues<T>;
  onSubmit: (values: T) => void;
  fields: FieldConfig<T>[];
  title?: string;
  submitLabel?: string;
}

export function AuthForm<T extends Record<string, unknown>>({
  schema,
  defaultValues,
  onSubmit,
  fields,
  submitLabel = "Submit",
}: AuthFormProps<T>) {
  const form = useForm<T>({
    resolver: yupResolver(schema),
    mode: "onChange", // ✅ validate while typing
    defaultValues,
  });

  // expose reset via props or context
  useEffect(() => {
    form.reset(defaultValues); // clears on mount
  }, [form, defaultValues]);

  return (
    <Form {...form}>
      <div className="flex flex-col gap-12">
        <form
          id="auth-form"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FieldGroup>
            {fields.map((f) => (
              <Controller
                key={String(f.name)}
                name={f.name}
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={String(f.name)}>{f.label}</FieldLabel>
                    <Input
                      {...field}
                      id={String(f.name)}
                      type={f.type}
                      placeholder={f.placeholder}
                      aria-invalid={fieldState.invalid}
                      value={String(field.value ?? "")}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            ))}
          </FieldGroup>
        </form>
        <Button
          type="submit"
          form="auth-form"
          className="w-full"
          size="lg"
        >
          {submitLabel}
        </Button>
      </div>
    </Form>
  );
}
