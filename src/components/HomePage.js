import React from 'react'

const HomePage = (props) => {

    return (
        <div className="welcome">
        <p className="jmodList">
       
             Welcome to Jmod Tracker. On the Jmods page you can see a list of Jmods and view their recent tweets and Reddit comments.
            You can choose to pin those comments and tweets to view them later on your profile. You can also follow a Jmod. This will
            display the Jmod in the 'feed' tab and let you know if there any new posts from the last time you visited your feed.
             Please note: This site is still in development. Experience is not yet optimized for mobile use.<br></br><br></br> 

            Don't see your favorite Jmod? Found an issue? Send an email to JmodTracker@altmails.com <br></br><br></br>
            </p>

            <p className="jmodList"> <br></br> <br></br> <br></br><br></br>This website uses your browser's localStorage to store your username, token, the list of jmods you follow,
                    and compare changes based on the last time you visited the 'Feed' page. This website's backend is hosted on heroku.com and frontend on netlify.com
                    Jmod Tracker does not send any information to third party advertisers.<br></br>
                    For questions/concerns reach out to JmodTracker@altmails.com<br></br>
                    <br></br>
                    <br></br>
                       
                    Heroku privacy policy: https://www.salesforce.com/company/privacy/
                    Netlify privacy policy: https://www.netlify.com/privacy/
                        </p> 
        
        </div>
    )

}

export default HomePage