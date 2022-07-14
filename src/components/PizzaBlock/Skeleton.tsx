import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton: React.FC = () => (
	<ContentLoader 
		className='pizza-block'
		speed={2}
		width={280}
		height={470}
		viewBox="0 0 280 470"
		backgroundColor="#ededed"
		foregroundColor="#ecebeb"
		>
		<circle cx="141" cy="125" r="125" /> 
		<rect x="0" y="272" rx="8" ry="8" width="280" height="28" /> 
		<rect x="0" y="310" rx="8" ry="8" width="280" height="90" /> 
		<rect x="130" y="414" rx="20" ry="20" width="150" height="45" /> 
		<rect x="0" y="420" rx="8" ry="8" width="84" height="32" />
	</ContentLoader>
)

export default Skeleton