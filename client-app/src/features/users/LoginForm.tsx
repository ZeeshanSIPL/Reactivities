import { ErrorMessage, Form, Formik } from "formik";
import MyTextInput from "../../app/common/form/MyTextInput";
import { Button, Label } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import { error } from "console";



export default  function LoginForm()
{
    const {userStore}= useStore();
    return(
        <Formik
        initialValues={{email: '',password: '',error: null}}
        onSubmit={(values,{setErrors}) => userStore.login(values).catch(error => 
            setErrors({error :'Invalid'}))}
        >
            {({handleSubmit, isSubmitting, errors})=>(
            <Form className='ui form' onSubmit={handleSubmit} autoComplete="off">
                <MyTextInput placeholder="Email" name ='email'></MyTextInput>
                <MyTextInput placeholder="Password" name='password' type='password'></MyTextInput>
                <ErrorMessage  name='error' render={()=>
                     <Label style={{marginBottom:10}} basic color="red" text='NOO' />}
                      />
                <Button loading={isSubmitting} positive content= 'Login' type="submit" fluid></Button>
                </Form>)}
        
   
    </Formik>
    )

}