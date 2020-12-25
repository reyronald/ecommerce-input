import * as React from 'react'
import { ECommerceInput, ECommerceDateInput } from './ECommerceInput'
import './styles.css'

export default function App() {
  React.useEffect(() => {
    document.title = 'ECommerceInput - @reyronald'
  }, [])

  return (
    <div className="App">
      <div>
        <ECommerceInput
          id="name"
          description="What is your name?"
          labelProps={{
            htmlFor: 'name',
            children: 'Name',
          }}
        />

        <br />

        <ECommerceInput
          id="password"
          type="password"
          description="Please input your password"
          labelProps={{
            htmlFor: 'password',
            children: 'Password',
          }}
        />

        <br />

        <ECommerceDateInput
          id="dateOfBirth"
          type="dateOfBirth"
          description="What is your date of birth?"
          labelProps={{
            htmlFor: 'dateOfBirth',
            children: 'Date of Birth',
          }}
        />
      </div>
    </div>
  )
}
