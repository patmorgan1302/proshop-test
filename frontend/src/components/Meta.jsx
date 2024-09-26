import { Helmet } from 'react-helmet-async';


const Meta = ({ title, description, keywords}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description}></meta>
            <meta name='keywords' content={keywords}></meta>

        </Helmet>
    )
};

Meta.defaultProps = {
    title: 'Welcome To The Store',
    description: 'We Sell The Best Stuff Ever!',
    keywords: 'art, buy art, screen prints, artsy fartsy'
};

export default Meta;