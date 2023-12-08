import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, FormField, Header, Label, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';
import {v4 as uuid} from 'uuid'; 

import { ErrorMessage, Field, Formik, FormikProps } from 'formik';
import * as Yup from'yup' ;
import { error } from 'console';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryOptions } from '../../../app/common/options/categoryOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';



export default observer (function ActivityForm()
{

    const {activityStore}= useStore();
    const {selectedActivity, createActivity,updateActivity,
        loading,loadActivity,loadingInitial}= activityStore; 
    const{id}= useParams();
    const navigate= useNavigate();

    const[activity,setActivity] =useState<Activity>({
        id:'',
        title:'',
        description:'',
        category:'',
        date:null,
        city:'', 
        venue:'',

    })

const validationSchema =Yup.object({
    title  :Yup.string().required('the activity title is required'),
    description  :Yup.string().required('the activity description is required'),
    category  :Yup.string().required('the activity category is required'),
    city  :Yup.string().required('the activity city is required'),
    date  :Yup.string().required('the activity date is required')


})

    useEffect(() =>{
        if(id) loadActivity(id).then(activity=> setActivity(activity!))

    } ,[id, loadActivity]);

    function handleFormSubmit(activity :Activity ){
        if(!activity.id){
            activity.id=uuid();
            createActivity(activity).then(()  => navigate(`/activities/${activity.id}`))
        }
        else{
            createActivity(activity).then(()  => navigate(`/activities/${activity.id}`))

        }
       

    }

    // function handleInputChange(event: ChangeEvent<HTMLInputElement>){
    //     const{name,value} =event.target; 
    //     setActivity({...activity,[name]:value})

    // }

    if (loadingInitial)  return <LoadingComponent content='Loading Activity...'/>
    return(
        <Segment clearing>
            <Header content ='Activity Details' sub color ='teal'/>
            <Formik 
            validationSchema ={validationSchema}
            enableReinitialize initialValues={activity} 
            onSubmit={values =>handleFormSubmit(values)}>
                
                {({ handleSubmit, isValid, isSubmitting, dirty}) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        {/* <FormField>
                            <Field placeholder='Title' name='title' />
                            <ErrorMessage name='title' 
                            render={error => <Label basic color ='red' context ={error}/>}/>
                        </FormField> */}
                        <MyTextInput name ='title' placeholder='Title'/>
                    <MyTextArea placeholder='Description' name='description' rows={3}/>
                    <MySelectInput placeholder='Category' name='category' rows={0} options={categoryOptions}/>
                    <MyDateInput
                      placeholderText='Date' 
                      name='date' 
                      showTimeSelect
                      timeCaption='time'
                      dateFormat='MMMM d, yyyy h:mm aa'
                      />
                       <Header content ='Location Details' sub color ='teal'/>
                    <MyTextInput placeholder='City'name='city' />
                    <MyTextInput placeholder= 'Venue' name='venue'/>
                    <Button
          
                    loading={loading}   floated= 'right' positive type='submit' content='Submit'/>
                    <Button floated= 'right'  type='button' content='Cancel'/>
                    
                </Form>
                     
                )}

            </Formik>
            
        </Segment>
    )

}) 