import { Routes } from "@angular/router";
import { BasicPage } from "./basic-page";
import { DynamicPage } from "./dynamic-page/dynamic-page";
import { SwitchesPage } from "./switches-page/switches-page";

export const authRoutes: Routes =[
    {
        path:'',
        children:[
            {
                path:'basic',
                title: 'Básicos',
                component: BasicPage
            },
            {
                path:'dynamic',
                title: 'Dinámicos',
                component: DynamicPage
            },
            {
                path:'switches',
                title: 'Switches',
                component: SwitchesPage
            },
            {
                path:'**',
                redirectTo:'basic'
            }
        ]
    }
]