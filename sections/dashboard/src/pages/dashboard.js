import React from 'react';
import {Router} from '@reach/router';
import { navigate } from 'gatsby';
import Layout from '../components/layout';
import Profile from '../components/profile';
import RouteBase from '../components/route-base';
import RouteSecret from '../components/route-secret';
import RouteLogin from '../components/route-login';
import IdentityModal from 'react-netlify-identity-widget';
import 'react-netlify-identity-widget/styles.css';
import PrivateRoute from '../components/private-route';

const Dashboard = ({location}) => {
    const [isVisible, setVisibility] = React.useState(false)
    React.useEffect(()=>{
        if(location.pathname.match(/^\/dashboard\/?$/)) {
            navigate('/dashboard/login', {replace: true})
        }
    }, [])

    const showModal = () => setVisibility(!isVisible)
    return (
        <Layout>
            <Profile showModal={showModal}/>
            <Router>
                <PrivateRoute component = {RouteBase} path="/dashboard/base"/>
                <PrivateRoute component={RouteSecret} path="/dashboard/secret"/>
                <RouteLogin path="/dashboard/login" showModal={showModal}/>
            </Router>
            <IdentityModal
                showDialog={isVisible}
                onCloseDialog={showModal}

            />
        </Layout>
    )
}

export default Dashboard;