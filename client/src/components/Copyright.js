import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopyright } from '@fortawesome/free-solid-svg-icons'

const Copyright = () => {
	return (
		<footer className='copyright'>
			<div className='content-container'>
				<div className='copyright__content'>
					<FontAwesomeIcon icon={faCopyright} />
					<span className='copyright__text'>2019 Task-App</span>
				</div>
			</div>
		</footer>
	)
}

export default Copyright
