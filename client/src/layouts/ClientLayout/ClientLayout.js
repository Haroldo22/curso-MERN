import React from 'react'

export function ClientLayout(props) {
    const { children } = props
    
  return (
    <div>
        <h2>ClientLayout esta siendo usado</h2>
        { children }
    </div>
  )
}
