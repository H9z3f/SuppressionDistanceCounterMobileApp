import React from 'react';
import {Image, View} from 'react-native';
import {Appbar, Button, Modal, Portal, Snackbar, Text, TextInput} from 'react-native-paper';

import styles from './styles';

import formula from './assets/formula.jpg';

export default function SuppressionDistanceCounter() {
    const [modalVisible, setModalVisible] = React.useState(false);
    const [snackbarVisible, setSnackbarVisible] = React.useState(false);
    const [result, setResult] = React.useState("");
    const [form, setForm] = React.useState({
        var1: "",
        var2: "",
        var3: "",
        var4: "",
        var5: "",
        var6: "",
        var7: "",
        var8: "",
    });

    const showSnackbar = () => setSnackbarVisible(true);
    const hideSnackbar = () => setSnackbarVisible(false);
    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);
    const calculateForm = () => {
        if (!form.var1 || !form.var2 || !form.var3 || !form.var4 || !form.var5 || !form.var6 || !form.var7 || !form.var8) return showSnackbar();

        let object = {};
        for (let key in form) {
            object[key] = parseFloat(form[key]);
        }

        let calculationResult = calculation(object).toFixed(3);
        if (!isNaN(calculationResult)) {
            setResult("Дистанция подавления = " + calculationResult + " метр");

            showModal();
        } else {
            showSnackbar();
        }
    };
    const clearForm = () => {
        setForm({
            var1: "",
            var2: "",
            var3: "",
            var4: "",
            var5: "",
            var6: "",
            var7: "",
            var8: "",
        });
    };
    const fillForm = (key, value) => {
        setForm((prev) => ({
            ...prev,
            [key]: value,
        }));
    };
    const calculation = ({var1, var2, var3, var4, var5, var6, var7, var8}) => {
        return var1 * Math.pow(Math.pow(10, 0.1 * ((10 * Math.log10(var2) + var4) - (10 * Math.log10(var3) + var4 - var6) - (var4 - var5) - (var2 / var3))) * var7 * var8, 1 / 2);
    };

    return (
        <View style={styles.app}>
            <Portal>
                <Modal contentContainerStyle={styles.modal}
                       visible={modalVisible}
                       onDismiss={hideModal}
                >
                    <Text variant="bodyLarge">{result}</Text>
                </Modal>
            </Portal>
            <View style={styles.appbar}>
                <Appbar.Header>
                    <Appbar.Content title="Suppression Distance Counter"/>
                </Appbar.Header>
            </View>
            <View style={styles.main}>
                <View style={styles.formula}>
                    <Image style={styles.image}
                           source={formula}
                           resizeMode="contain"
                    />
                </View>
                <View>
                    <TextInput keyboardType="numeric"
                               label="Дистанция без затухания, метр"
                               mode="outlined"
                               value={form.var1}
                               onChangeText={(value) => fillForm("var1", value)}
                    />
                    <TextInput keyboardType="numeric"
                               label="Мощность приемника, Ватт"
                               mode="outlined"
                               value={form.var2}
                               onChangeText={(value) => fillForm("var2", value)}
                    />
                    <TextInput keyboardType="numeric"
                               label="Мощность передатчика, Ватт"
                               mode="outlined"
                               value={form.var3}
                               onChangeText={(value) => fillForm("var3", value)}
                    />
                    <TextInput keyboardType="numeric"
                               label="Усиление антенны"
                               mode="outlined"
                               value={form.var4}
                               onChangeText={(value) => fillForm("var4", value)}
                    />
                    <TextInput keyboardType="numeric"
                               label="Усиление антенны в данном направлении"
                               mode="outlined"
                               value={form.var5}
                               onChangeText={(value) => fillForm("var5", value)}
                    />
                    <TextInput keyboardType="numeric"
                               label="Потери"
                               mode="outlined"
                               value={form.var6}
                               onChangeText={(value) => fillForm("var6", value)}
                    />
                    <TextInput keyboardType="numeric"
                               label="Вертикальная поляризация"
                               mode="outlined"
                               value={form.var7}
                               onChangeText={(value) => fillForm("var7", value)}
                    />
                    <TextInput keyboardType="numeric"
                               label="Ширина диаграммы направленности антенны"
                               mode="outlined"
                               value={form.var8}
                               onChangeText={(value) => fillForm("var8", value)}
                    />
                </View>
                <View style={styles.buttonGroup}>
                    <Button style={styles.leftButton}
                            icon="play"
                            mode="contained"
                            onPress={calculateForm}
                    >Рассчитать</Button>
                    <Button style={styles.rightButton}
                            icon="delete"
                            mode="outlined"
                            onPress={clearForm}
                    >Очистить</Button>
                </View>
                <View>
                    <Snackbar visible={snackbarVisible}
                              onDismiss={hideSnackbar}
                              action={{
                                  icon: "close",
                              }}
                    >Проверьте правильность введенных значений</Snackbar>
                </View>
            </View>
        </View>
    );
}
