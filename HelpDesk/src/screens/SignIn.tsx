import { Heading, Icon, useTheme, VStack } from 'native-base';
import auth from '@react-native-firebase/auth'
import { Envelope, Key } from 'phosphor-react-native';
import { useState } from 'react';

import Logo from '../assets/logo_primary.svg';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Alert } from 'react-native';

export function SignIn() {
	const [isLoading , setIsLoading]=useState(false)
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	function handleSignIn(){
		if(!email || !password){
			return Alert.alert('Entrar', 'Informe suas credênciais.')
		}
		setIsLoading(true);
		auth().signInWithEmailAndPassword(email,password).catch((error)=>{
			console.log(error);
			setIsLoading(false);

			if(error.code==="auth/invalid-email"){
				return Alert.alert('Entrar', 'E-mail invalido')
			}

			if(error.code==="auth/user-not-found"){
				return Alert.alert( 'Entrar', 'E-mail ou senha inválida.')
			}
			if(error.code==="auth/wrong-password"){
				return Alert.alert('Entrar', 'E-mail ou senha inválida.')
			}

			return Alert.alert('Entrar', 'Não foi possivel acessar')
			
		})

	}

	const { colors } = useTheme();



	return (
		<VStack flex={1} alignItems='center' bg='gray.600' px={8} pt={40}>
			<Logo />
			<Heading color='gray.100' fontSize='xl' mt={6} mb={6}>
				Acesse sua conta
			</Heading>
			<Input
				placeholder='E-mail'
				mb={4}
				InputLeftElement={
					<Icon as={<Envelope color={colors.gray[300]} />} ml={4} />
				}
				onChangeText={setEmail}
			/>
			<Input
				placeholder='Senha'
				mb={8}
				InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
				secureTextEntry
				onChangeText={setPassword}
			/>

			<Button title='Entrar' 
			w='full' onPress={handleSignIn}
			isLoading={isLoading}
			/>
		</VStack>
	);
}
