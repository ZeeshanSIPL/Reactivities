import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import List from 'semantic-ui-react/dist/commonjs/elements/List';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';

function App() {
  const [activities,setActivities] =useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity]= useState<Activity | undefined>(undefined);
  const [editMode,setEditMode] =useState (false);

  useEffect(()=>{
    axios.get<Activity[]>('http://localhost:5000/api/activities')
    .then(response =>{
     // console.log(response);
      setActivities(response.data);
    })
  },[])

  function handleSelectActivity(id: string){
    setSelectedActivity(activities.find(x=>x.id === id));
  }

  function handleCancelSelectedActivity(){
    setSelectedActivity(undefined);
  }
  function handleFormOpen(id? :string){
    id? handleSelectActivity(id) : handleCancelSelectedActivity();
    setEditMode (true);

  }
  function handleFromClose(){
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity){
    activity.id
    ? setActivities([...activities.filter(x=>x.id !== activity.id), activity])
    : setActivities ([...activities,{...activity, id:uuid()}]);
    setEditMode(false);
    setSelectedActivity(activity);


  }
  function hanleDeleteActivity(id : string){
    setActivities([...activities.filter(x=>x.id !== id)])
  }
  return (
    <>
     {/* <Header as ='h2' icon='users' content='Reactivities'/> */}
     <NavBar openForm={handleFormOpen}/>
     <Container style={{marginTop:'7em' }}>    
      <ActivityDashboard 
      activities= {activities}
      selectedActivity= {selectedActivity}
      selectActivity= {handleSelectActivity}
      cancelSelectActivity={handleCancelSelectedActivity}
      editMode={editMode}
      openForm= {handleFormOpen}
      closeForm={handleFromClose}
      createOrEdit ={handleCreateOrEditActivity}
      deleteActivity ={hanleDeleteActivity}
      />
      

      </Container>

      </>
  );
}

export default App;
