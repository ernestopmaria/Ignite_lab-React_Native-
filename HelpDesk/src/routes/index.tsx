import { NavigationContainer } from "@react-navigation/native";
import { SignIn } from "../screens/SignIn";
import { AppRoutes } from './app.routes';
import { useEffect, useState } from "react";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import auth from '@react-native-firebase/auth';
import { Loading } from "../components/Loading";




export function Routes(){

    const [loading, setIsLoading]=useState(true)
    const [user, setUser] = useState<FirebaseAuthTypes.User>()

    useEffect(()=>{
        const subscriber =auth().onAuthStateChanged(response=>{
            setUser(response);
            setIsLoading(false)
        })

        return subscriber
    },[])

    if(loading){
        return<Loading/>
    }

    return(
        <NavigationContainer>
           {user? <AppRoutes/>:<SignIn/>}
        </NavigationContainer>
    )
}