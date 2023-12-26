
import { Link, NavLink } from 'react-router-dom';
import { Button, Container, Menu, Image, Dropdown, } from 'semantic-ui-react';
import { useStore } from '../stores/store';



export default function NavBar()
{
    const {userStore :{user,logout} } =useStore();

   
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to ='/'header >
                    <img src="/assets/logo.png" alt ="logo" style={{marginRight :'10px'}}/>
                    Reactivities 
                <Menu.Item as={NavLink} to ='/activities' name="Activities"/> 
               <Button as ={NavLink} to ='/createActivity' positive content= 'Create Avtivity'/> 
                </Menu.Item>
                <Menu.Item position='right'>
                    <Image src={user.image || '/assets/use.png'} avatar spaced='right'/>
                    <Dropdown pointing ='top left' text= {user.displayName}>
                        <Dropdown.Item as {Link} to={`/profile/${user.username}`}/>
                        </Dropdown>


                </Menu.Item>
            </Container>
        </Menu>
    )
}