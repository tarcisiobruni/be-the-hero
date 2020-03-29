import React from 'react'
import { View, TouchableOpacity, Image, Text, Linking } from 'react-native'
import styles from './styles'
import logoImg from '../../assets/logo.png'
import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import * as MailComposer from 'expo-mail-composer'

export default function Detail() {
    const navigation = useNavigation()
    const message = `Olá, ${incident.name}, estou entrando em contato pois vi o caso ${incident.title}. Estou enviando ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}`;
    const route = useRoute();
    const incident = route.params.incident
    function navigateBack() {
        navigation.goBack()
    }


    function sendMail() {
        MailComposer.composeAsync({
            subject: `Heroi do Caso: ${incident.title}`,
            recipients: [incident.title],
            body: message
        })
    }
    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`)
    }

    return (
        <View style={styles.container} >
            <View style={styles.header}>
                <Image source={logoImg}></Image>
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#E02141"></Feather>
                </TouchableOpacity>
            </View>

            <View style={styles.incident}>
                <Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG</Text>
                <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

                <Text style={styles.incidentProperty}>Caso</Text>
                <Text style={styles.incidentValue}>{incident.title}</Text>

                <Text style={styles.incidentProperty}>Valor</Text>
                <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia</Text>
                <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>
                <Text style={styles.heroDescription}>Entre em contato</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                        <Text style={styles.actionText}>Whatsapp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>Email</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}