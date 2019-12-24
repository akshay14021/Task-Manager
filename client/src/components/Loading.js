import React from 'react'
import Lottie from 'react-lottie'
import * as jsonData from '../json/rgb-loading.json'
import * as doneData from '../json/done.json'

const defaultOptions = {
	loop: true,
	autoplay: true,
	animationData: jsonData.default,
	rendererSettings: {
		preserveAspectRatio: 'xMidYMid slice'
	}
}

const defaultOptions2 = {
	loop: true,
	autoplay: true,
	animationData: doneData.default,
	rendererSettings: {
		preserveAspectRatio: 'xMidYMid slice'
	}
}

class Loading extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			done: undefined,
			loading: false
		}
	}

	componentDidMount() {
		setTimeout(() => {
			this.setState({ loading: true })
		}, 3000)
	}

	render() {
		return (
			<div className='loading'>
				<div className='content-container'>
					{!this.state.loading ? (
						<>
							<h1 className='loading__header'>Fetching data</h1>
							<Lottie
								options={defaultOptions}
								height={200}
								width={300}
							/>
						</>
					) : (
						<>
							<h1 className='loading__header'>
								Data Fetched...loading component
							</h1>
							<Lottie
								options={defaultOptions2}
								height={200}
								width={300}
							/>
						</>
					)}
				</div>
			</div>
		)
	}
}

export default Loading
