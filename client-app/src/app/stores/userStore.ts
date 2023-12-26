import agent from "../api/agent";
import { User, UserFormValues } from "../models/user";
import { makeAutoObservable, runInAction } from 'mobx' ;
import { store } from "./store";
import { router } from "../router/Router";


export default class userStore{

    user :User| null= null;
    token : string |null=null;
    appLoaded=false;


    setToken =( token : string|null) => {
    if(token) localStorage.setItem('jwt', token);
    this.token=token;


    }
    setAppLoaded = () =>
    this.appLoaded=true;
     

    constructor (){
        makeAutoObservable(this);


    }
    get isLoggedIn(){
        return !! this.user;
    }
    login =async(creds :UserFormValues) =>{
        try{
            const user= await agent.Account.login(creds);
            this.setToken(user.token);
            runInAction (() =>this.user =user);
            router.navigate('/activities');
            console.log(user);

        }
        catch (error){
            throw error;

        }
    }

    logout = () =>{
        this.setToken(null);
        localStorage.removeItem('jwt');
        this.user=null;
        router .navigate('/')
    }
}