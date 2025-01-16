import {
  Text,
  ImageBackground,
  TouchableOpacity,
  Alert,
  View,
  ActivityIndicator,
} from "react-native";
import backgroundImg from "../assets/background.png";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../components/Input";
import { useAuth } from "../hooks/userAuth";
import { AppErrors } from "../utils/AppErrors";
import colors from "tailwindcss/colors";
import { useState } from "react";

const schema = z.object({
  user: z.string().min(1, "Campo Obrigatório"),
  password: z.string().min(1, "Campo obrigatório"),
});

export type FormData = z.infer<typeof schema>;

export function SignIn() {
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit } = useForm<FormData>({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: {
      user: "",
      password: "",
    },
  });

  const { signIn } = useAuth();

  const onSubmit: SubmitHandler<FormData> = async ({ user, password }) => {
    try {
      setLoading(true);
      await signIn(user, password);
    } catch (error) {
      setLoading(false);
      if (error instanceof AppErrors) {
        Alert.alert(error.message);
      } else {
        Alert.alert(
          "Não foi possível realizar login! Tente novamente mais tarde."
        );
      }
    }
  };

  return (
    <ImageBackground
      source={backgroundImg}
      className="flex-1  justify-center p-14"
    >
      <Text className="font-bold text-4xl text-emerald-600 text-center">
        Car Brands
      </Text>
      <Text className="font-regular  text-emerald-50 text-center text-xl opacity-55 mb-7">
        Veja todos os modelos de carros de uma marca
      </Text>
      <View className="gap-4">
        <Input name="user" control={control} label="Usuário" />
        <Input name="password" control={control} label="Senha" />
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          className="w-full bg-emerald-600 rounded-md px-2 py-4 disabled:opacity-80"
          activeOpacity={0.8}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={colors.zinc[800]} />
          ) : (
            <Text className="text-white text-center font-bold text-lg">
              Entrar
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
