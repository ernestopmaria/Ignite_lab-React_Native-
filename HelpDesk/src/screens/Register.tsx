import {  useState } from 'react';
import Logo from '../assets/logo_primary.svg';
import { Heading, Icon, useTheme, VStack } from 'native-base';
import { Input } from '../components/Input';
import { Envelope, Key } from 'phosphor-react-native';
import { Button } from '../components/Button';
import { Header } from '../components/Header';

export function Register() {


	const { colors } = useTheme();
	return (
		<VStack flex={1}  bg='gray.600' p={6} >
            <Header title='Nova solicitação'/>
            <Input
            placeholder='Numero do Patrimônio'
        
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
            />	

			<Button title='Cadastrar'mt={5} />
		</VStack>
	);
}
