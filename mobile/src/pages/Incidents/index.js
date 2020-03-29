import React, { useEffect, useState } from 'react'
import { View, Image, Text, TouchableOpacity, FlatList } from 'react-native'
import styles from './styles'
import logoImg from '../../assets/logo.png'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import api from '../../services/api'

export default function Incidents() {
    const navigation = useNavigation()
    const [incidents, setIncidents] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

    function navigationToDetail(incident) {
        navigation.navigate('Detail', { incident })
    }

    async function loadIncidents() {
        if (loading) {
            return;
        }

        if (total > 0 && incidents.length === total) {
            return;
        }

        setLoading(true)

        const response = await api.get('incidents', {
            params: {
                page
            }
        })

        setLoading(false)

        setIncidents([...incidents, ...response.data])
        setPage(page + 1)
        setTotal(response.headers['x-total-count'])
    }

    useEffect(() => {
        loadIncidents()
    },[])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}></Image>
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}> {total} casos</Text>
                </Text>
            </View>

            <Text style={styles.title}>Bem Vindo</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia, Herói!</Text>

            <FlatList 
                data={incidents}
                style={styles.incidentList}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={true}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.3}
                renderItem={({ item: incident }) => (
                    <View style={styles.incident}>
                        <Text style={[styles.incidentProperty]}>ONG</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>Caso</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>Valor</Text>
                        <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</Text>

                        <TouchableOpacity
                            style={styles.detailsButton}
                            onPress={() => navigationToDetail(incident)}>
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02141"></Feather>
                        </TouchableOpacity>

                    </View>
                )}
            />
        </View>

    );
}