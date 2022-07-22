
import { useTheme, VStack } from 'native-base';

import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { useState } from 'react';
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native';

export function Register() {
    const [isLoading, setIsLoading] = useState(false)
    const [patrimony, setPatrimony] = useState('')
    const [description, setDescriptions] = useState('')

    const navigation = useNavigation()

    function handleNewOrderRegister(){
        if(!patrimony || !description){
           return Alert.alert('Registar', 'Preencha todos os campos.');
        }
        setIsLoading(true);


        firestore().collection('orders').add({
            patrimony,
            description,
            status:'open',
            created_at:firestore.FieldValue.serverTimestamp()
        }).then(()=>{
            Alert.alert('Solicitação', 'Solicitação registrada com sucesso.');
            navigation.goBack()
        }).catch((error)=>{
            console.log(error);
            setIsLoading(false)
            return   Alert.alert('Solicitação', 'Não foi possivel registrar o pedido');
        })
    }


	const { colors } = useTheme();
	return (
		<VStack flex={1}  bg='gray.600' p={6} >
            <Header title='Solicitação'/>
            <Input
            placeholder='Numero do Patrimônio'
            onChangeText={setPatrimony}
            mt={4}
            multiline
            textAlignVertical='top'
            />
		
            <Input
            placeholder='Descrição do problema'
            flex={1}
            mt={5}
            multiline
            textAlignVertical='top'
            onChangeText={setDescriptions}
            />	

			<Button title='Cadastrar'mt={5} onPress={handleNewOrderRegister} 
            isLoading={isLoading}
            />
		</VStack>
	);
}
