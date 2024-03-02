import { NavigationContainer } from "@react-navigation/native";
import { AppRouter } from "./app.routes";


export function Routes (){
    return(
        <NavigationContainer>
            <AppRouter/>
        </NavigationContainer>
    )
}