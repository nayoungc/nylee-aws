// src/amplifyconfiguration.ts를 사용
import { Amplify } from 'aws-amplify';
import amplifyconfig from '../amplify_outputs.json'; 

Amplify.configure(amplifyconfig);