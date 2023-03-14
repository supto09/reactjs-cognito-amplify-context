import { Amplify } from 'aws-amplify';
import { AwsConfig } from '../config/aws';

export const configureAmplify = () => {
    Amplify.configure({
        Auth: {
            // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
            // identityPoolId: AWS_AppSync.userIdentityPoolId,

            // REQUIRED - Amazon Cognito Region
            region: AwsConfig.region,

            // OPTIONAL - Amazon Cognito Federated Identity Pool Region
            // Required only if it's different from Amazon Cognito Region
            // identityPoolRegion: 'XX-XXXX-X',

            // OPTIONAL - Amazon Cognito User Pool ID
            userPoolId: AwsConfig.userPoolId,

            // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
            userPoolWebClientId: AwsConfig.userPoolWebClientId,

            // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
            mandatorySignIn: false,

            // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
            authenticationFlowType: 'USER_PASSWORD_AUTH'

            // OPTIONAL - Configuration for cookie storage
            // cookieStorage: {
            //     // REQUIRED - Cookie domain (only required if cookieStorage is provided)
            //     domain: 'localhost',
            //     // OPTIONAL - Cookie path
            //     path: '/',
            //     // OPTIONAL - Cookie expiration in days
            //     expires: 365,
            //     // OPTIONAL - Cookie secure flag
            //     secure: false
            // }
        }
    });
};
