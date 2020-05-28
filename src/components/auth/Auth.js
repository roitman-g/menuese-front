import React, {useState} from 'react'
import "./Auth.scss";
import { withLogIn, withSignUp} from '../../gql'
import Form from '../../shared/form/Form'
import Button from '../../shared/button/Button'

// const LogIn = compose(withLogIn({username: '', password: ''}), withApollo)(Entity)
const LogIn = withLogIn({initialForm: {username: '', password: ''}})(Form)
const SignUp = withSignUp({initialForm: {username: '', password: ''}})(Form)

const lessThan7 = value => value.length < 7
const lessThan7Checker = {validate: lessThan7, message: 'It cant be that long'}

const Auth = (props) => {
    const [screen, setScreen] = useState('logIn')

    return (
        <div className="auth">
            <div className="auth__options">
                <Button onClick={() => setScreen('logIn')}>LogIn</Button>
                <Button onClick={() => setScreen('signUp')}>SignIn</Button>
            </div>   
            {screen === 'logIn' ? (
            <LogIn>
                <LogIn.Field label='Username' name='username' checkers = {[lessThan7Checker]}/>
                <LogIn.Field label='Password' name='password'/>
            </LogIn>
            ) : (
            <SignUp>
                <SignUp.Field label='Username' name='username'/>
                <SignUp.Field label='Password' name='password'/>
                <SignUp.Field label='Repeat password' name='repeatPassword'/>
            </SignUp>
            )}
        </div>
    )
}

export default Auth;
