import React from 'react'
import Lottie from 'react-lottie'
import * as jsonData from '../json/rgb-loading.json'

const defaultOptions = {
	loop: true,
	autoplay: true,
	animationData: jsonData.default,
	rendererSettings: {
		preserveAspectRatio: 'xMidYMid slice'
	}
}

const Loading = () => {
	return (
		<div className='loading'>
			<Lottie options={defaultOptions} height={200} width={300} />
		</div>
	)
}

export default Loading
