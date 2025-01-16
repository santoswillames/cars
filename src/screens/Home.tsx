import React from "react";
import { Alert, FlatList, Text, View } from "react-native";
import { Header } from "../components/Header";
import { useAuth } from "../hooks/userAuth";
import { ArrowRight, Car, LogOut } from "lucide-react-native";
import { useEffect, useState } from "react";
import { ListEmpty } from "../components/ListEmpty";
import { Item } from "../components/Item";

import colors from "tailwindcss/colors";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "../routes/app.routes";
import { AppErrors } from "../utils/AppErrors";
import { apiBrands } from "../service/api";
import { BrandsDTO } from "../dtos/BrandsDTO";
import { Loading } from "../components/Loading";

export function Home() {
  const { user, signOut } = useAuth();
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const [isLoading, setIsLoading] = useState(true);
  const [brands, setBrands] = useState<BrandsDTO[]>([]);

  async function fetchBrands() {
    try {
      setIsLoading(true);
      const { data } = await apiBrands.get<BrandsDTO[]>("/marcas");
      setBrands(data);
    } catch (error) {
      if (error instanceof AppErrors) {
        Alert.alert(error.message);
      } else {
        Alert.alert("Erro ao tentar buscar as marcas!");
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <View className="flex-1 ">
      <Header.Root>
        <Header.Text text={`Olá, ${user.name}`} />
        <Header.Actions>
          <Header.Action icon={LogOut} onPress={signOut} />
        </Header.Actions>
      </Header.Root>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <View className="flex-row items-center gap-6 pt-5 pb-2 px-8">
            <Car color={colors.emerald[600]} size={32} />
            <Text className=" text-white text-xl ">Marcas</Text>
          </View>

          <FlatList
            className="px-8"
            data={brands}
            keyExtractor={(item) => item.codigo}
            showsVerticalScrollIndicator
            renderItem={({ item }) => (
              <Item.Root>
                <Item.Button
                  onPress={() =>
                    navigation.navigate("model", { brandCode: item.codigo })
                  }
                >
                  <Item.Text text={item.nome} />
                  <Item.Icon icon={ArrowRight} />
                </Item.Button>
              </Item.Root>
            )}
            ListEmptyComponent={() => (
              <ListEmpty message="Não há marcas a serem listadas" />
            )}
          />
        </>
      )}
    </View>
  );
}
