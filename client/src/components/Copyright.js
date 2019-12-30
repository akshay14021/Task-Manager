import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopyright } from '@fortawesome/free-solid-svg-icons'

const Copyright = () => {
	return (
		<footer className='copyright'>
			<div className='content-container'>
				<div className='copyright__content'>
					<span className='copyright__text'>
						Created by Akshay Joshi,
					</span>
					<FontAwesomeIcon icon={faCopyright} />
					<span className='copyright__year'>2019</span>
				</div>
			</div>
		</footer>
	)
}

export default Copyright
