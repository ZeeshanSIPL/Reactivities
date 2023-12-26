import { useContext } from "react";
import { createContext } from "react";
import ActivityStore from "./activityStore";
import userStore from "./userStore";


interface Store{
    [x: string]: any;
    activityStore: ActivityStore;
    userStore: userStore;

}
export const store: Store={
    activityStore: new ActivityStore(),
    userStore: new userStore()

}
export  const StoreContext= createContext(store)

export function useStore(){
    return useContext(StoreContext);
}