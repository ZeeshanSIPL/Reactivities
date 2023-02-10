import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';

import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  const {activityStore} =useStore();
  
  const [activities,setActivities] =useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity]= useState<Activity | undefined>(undefined);

  const [submitting,setSubmitting]=useState(false);

  useEffect(()=>{
    activityStore.loadActivities();


  },[activityStore])


   function hanleDeleteActivity(id : string){
    setSubmitting(true);
    agent.Activities.delete(id).then(() =>{
      setActivities([...activities.filter(x =>x.id !== id)]);
      setSubmitting(false);


    })
    setActivities([...activities.filter(x=>x.id !== id)])
  }

  if(activityStore.loadingInitial) return <LoadingComponent content='Loading app'/>
  return (
    <>
     {/* <Header as ='h2' icon='users' content='Reactivities'/> */}
     <NavBar />
     <Container style={{marginTop:'7em' }}>   

      <ActivityDashboard 
      activities= {activityStore.activities}
      selectedActivity= {selectedActivity}  
      
      deleteActivity ={hanleDeleteActivity}
      submitting ={submitting}
      
      />
      

      </Container>

      </>
  );
}

export default observer(App);
