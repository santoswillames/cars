import React from "react";
import { Controller, UseControllerProps, FieldValues } from "react-hook-form";
import { Text, TextInput, TextInputProps, View } from "react-native";

interface InputProps extends TextInputProps {
  label: string;
}

export function Input<FormType extends FieldValues>({
  name,
  control,
  label,
  ...rest
}: UseControllerProps<FormType> & InputProps) {
  return (
    <View>
      <Text className="text-white text-lg mb-1">{label}</Text>
      <Controller
        control={control}
        name={name}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <>
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              {...rest}
              className={`w-full bg-zinc-700 rounded-md px-2 py-4 text-white text-lg border-2 ${
                error
                  ? "border-red-400"
                  : "focus:border-emerald-600 border-zinc-700"
              }`}
            />
            {error && (
              <Text className="text-red-400 text-base">{error.message}</Text>
            )}
          </>
        )}
      />
    </View>
  );
}
