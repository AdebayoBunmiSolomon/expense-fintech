import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { colors } from "@src/resources/colors";
import { DVH, moderateScale, verticalScale } from "@src/resources/scaling";
import { useCategory } from "@src/services";
import { LightText } from "../shared/text/light-text";
import { FontAwesome } from "@expo/vector-icons";
import { IconButton } from "../shared/buttons/icon-button";
import { RegularText } from "../shared/text/regular-text";

type categoryModalProps = {
  closeModal: () => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
};

export const CategoryModal: React.FC<categoryModalProps> = ({
  closeModal,
  setSelectedCategory,
  selectedCategory,
}) => {
  const { categoryData } = useCategory();
  return (
    <View style={styles.container}>
      <View style={styles.modalItemContainer}>
        {categoryData && categoryData.length > 0 ? (
          <FlatList
            data={categoryData && categoryData}
            keyExtractor={(items, index) =>
              items.id.toString() + index.toString()
            }
            renderItem={({ item, index }) => (
              <TouchableOpacity
                key={index}
                style={styles.categoryItemBtn}
                onPress={() => setSelectedCategory(item.category)}>
                <LightText>{item.category}</LightText>
                <FontAwesome
                  name={"check-circle"}
                  color={
                    item.category === selectedCategory
                      ? colors.blue
                      : colors.lightGray
                  }
                  size={moderateScale(20)}
                />
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
            maxToRenderPerBatch={2}
            initialNumToRender={2}
            windowSize={2}
            updateCellsBatchingPeriod={100}
          />
        ) : (
          <RegularText sizeBody black>
            No categories added yet
          </RegularText>
        )}
        <IconButton
          title='close'
          titleType='regular'
          textWhite
          style={{
            backgroundColor: colors.main,
          }}
          onPress={() => closeModal()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.267)",
    zIndex: 10,
    position: "absolute",
  },
  modalItemContainer: {
    backgroundColor: colors.white,
    width: "90%",
    height: DVH(30),
    borderRadius: moderateScale(10),
    padding: moderateScale(10),
  },
  categoryItemBtn: {
    paddingVertical: verticalScale(5),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
