// amplify/data/resource.ts
import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

// 스키마 정의
const schema = a.schema({
  // A. 카탈로그 및 기본 정보 테이블
  
  // 1. 과정 카탈로그
  CourseCatalog: a.model({
    catalogId: a.id(),
    courseName: a.string().required(),
    courseCode: a.string(),
    level: a.string(),
    duration: a.string(),
    deliveryMethod: a.string(),
    description: a.string(),
    objectives: a.list(a.string()),
    targetAudience: a.string(),
    status: a.enum(['ACTIVE', 'EOL']).default('ACTIVE'),
    createdAt: a.datetime(),
    updatedAt: a.datetime()
  })
  .authorization([a.allow.public().to(['read']), a.allow.authenticated(), a.allow.owner(), a.allow.group('admin')])
  .index('byCatalogName', { sortKeyFields: ['courseName'] })
  .index('byCatalogCode', { sortKeyFields: ['courseCode'] }),

  // 2. 카탈로그 모듈
  CatalogModule: a.model({
    catalogId: a.string().required(),
    moduleNumber: a.string().required(),
    moduleId: a.string().required(),
    title: a.string().required(),
    description: a.string(),
    duration: a.string(),
    objectives: a.list(a.string())
  })
  .authorization([a.allow.public().to(['read']), a.allow.authenticated(), a.allow.group('admin')])
  .index('byModuleId', { sortKeyFields: ['moduleId'] }),

  // 3. 카탈로그 실습
  CatalogLab: a.model({
    catalogId: a.string().required(),
    labId: a.string().required(),
    moduleId: a.string().required(),
    labNumber: a.string().required(),
    title: a.string().required(),
    description: a.string(),
    duration: a.string(),
    instructions: a.string(),
    resources: a.list(a.string())
  })
  .authorization([a.allow.public().to(['read']), a.allow.authenticated(), a.allow.group('admin')])
  .index('byModuleAndLabNumber', { keyFields: ['moduleId'], sortKeyFields: ['labNumber'] }),

  // 4. 카탈로그 교육 자료
  CatalogMaterial: a.model({
    catalogId: a.string().required(),
    materialTypeId: a.string().required(),
    moduleId: a.string().required(),
    materialType: a.string().required(),
    title: a.string().required(),
    description: a.string(),
    s3Key: a.string().required(),
    version: a.string()
  })
  .authorization([a.allow.public().to(['read']), a.allow.authenticated(), a.allow.group('admin')])
  .index('byModuleAndMaterialType', { keyFields: ['moduleId'], sortKeyFields: ['materialType'] }),

  // B. 문제 및 퀴즈 관련 테이블

  // 5. 문항 은행
  QuestionBank: a.model({
    questionId: a.id(),
    content: a.string().required(),
    questionType: a.enum(['multipleChoice', 'trueFalse', 'essay', 'matching', 'coding']).required(),
    options: a.list(a.json()),
    correctAnswer: a.json().required(),
    explanation: a.string(),
    difficulty: a.enum(['easy', 'medium', 'hard']).default('medium'),
    tags: a.list(a.string()),
    points: a.integer().default(1),
    metadata: a.json(),
    createdAt: a.datetime(),
    updatedAt: a.datetime(),
    createdBy: a.string()
  })
  .authorization([a.allow.public().to(['read']), a.allow.authenticated(), a.allow.group('admin')])
  .index('byQuestionType', { sortKeyFields: ['questionType'] })
  .index('byDifficulty', { sortKeyFields: ['difficulty'] })
  .index('byCreator', { sortKeyFields: ['createdBy'] }),

  // 6. 카탈로그 퀴즈
  CatalogQuiz: a.model({
    catalogId: a.string().required(),
    quizTypeId: a.string().required(),
    moduleId: a.string().required(),
    quizId: a.string().required(),
    quizType: a.string().required(),
    title: a.string().required(),
    description: a.string(),
    timeLimit: a.integer(),
    passingScore: a.integer()
  })
  .authorization([a.allow.public().to(['read']), a.allow.authenticated(), a.allow.group('admin')])
  .index('byQuizTypeAndCatalog', { keyFields: ['quizType'], sortKeyFields: ['catalogId'] })
  .index('byModuleAndQuiz', { keyFields: ['moduleId'], sortKeyFields: ['quizId'] }),

  // 7. 카탈로그 문항
  CatalogQuestion: a.model({
    quizId: a.string().required(),
    questionNumber: a.string().required(),
    catalogId: a.string().required(),
    questionId: a.string().required(),
    points: a.integer()
  })
  .authorization([a.allow.public().to(['read']), a.allow.authenticated(), a.allow.group('admin')])
  .index('byCatalog', { sortKeyFields: ['catalogId'] })
  .index('byQuestion', { sortKeyFields: ['questionId'] }),

  // 8. 퀴즈 카탈로그
  QuizCatalog: a.model({
    quizCatalogId: a.id(),
    title: a.string().required(),
    description: a.string(),
    questionItems: a.list(a.json()),
    totalPoints: a.integer(),
    defaultTimeLimit: a.integer(),
    category: a.string(),
    difficulty: a.enum(['beginner', 'intermediate', 'advanced']),
    tags: a.list(a.string()),
    isActive: a.boolean().default(true),
    metadata: a.json(),
    createdAt: a.datetime(),
    updatedAt: a.datetime(),
    createdBy: a.string()
  })
  .authorization([a.allow.public().to(['read']), a.allow.authenticated(), a.allow.group('admin')])
  .index('byCategory', { sortKeyFields: ['category'] })
  .index('byDifficulty', { sortKeyFields: ['difficulty'] })
  .index('byCreator', { sortKeyFields: ['createdBy'] }),

  // C. 과정 운영 관련 테이블

  // 9. 개설된 과정 인스턴스
  Course: a.model({
    courseId: a.id(),
    startDate: a.string().required(),
    catalogId: a.string().required(),
    endDate: a.string().required(),
    location: a.string(),
    instructorId: a.string(),
    status: a.enum(['scheduled', 'inProgress', 'completed', 'cancelled']).required(),
    customerId: a.string(),
    maxAttendees: a.integer(),
    currentAttendees: a.integer().default(0),
    shareCode: a.string(),
    createdAt: a.datetime(),
    updatedAt: a.datetime()
  })
  .authorization([a.allow.authenticated(), a.allow.owner(), a.allow.group('admin'), a.allow.group('instructor')])
  .index('byCatalogAndStartDate', { keyFields: ['catalogId'], sortKeyFields: ['startDate'] })
  .index('byShareCode', { keyFields: ['shareCode'] })
  .index('byInstructorAndStartDate', { keyFields: ['instructorId'], sortKeyFields: ['startDate'] })
  .index('byCustomerAndStartDate', { keyFields: ['customerId'], sortKeyFields: ['startDate'] }),

  // 10. 고객사 정보
  Customer: a.model({
    customerId: a.id(),
    customerName: a.string().required(),
    contactPerson: a.string(),
    contactEmail: a.string(),
    contactPhone: a.string(),
    address: a.string(),
    industry: a.string(),
    createdAt: a.datetime(),
    updatedAt: a.datetime()
  })
  .authorization([a.allow.authenticated(), a.allow.group('admin')])
  .index('byCustomerName', { sortKeyFields: ['customerName'] })
  .index('byIndustry', { sortKeyFields: ['industry'] }),

  // 11. 코스-퀴즈 연결
  CourseQuiz: a.model({
    courseQuizId: a.id(),
    courseId: a.string().required(),
    quizCatalogId: a.string().required(),
    quizType: a.enum(['pre', 'post', 'practice', 'final']).required(),
    title: a.string(),
    description: a.string(),
    timeLimit: a.integer(),
    startDate: a.string(),
    endDate: a.string(),
    passingScore: a.integer(),
    weight: a.integer(),
    maxAttempts: a.integer(),
    showAnswers: a.boolean(),
    randomizeQuestions: a.boolean(),
    isActive: a.boolean().default(true),
    createdAt: a.datetime(),
    updatedAt: a.datetime()
  })
  .authorization([a.allow.authenticated(), a.allow.group('admin'), a.allow.group('instructor')])
  .index('byCourse', { sortKeyFields: ['courseId'] })
  .index('byQuizCatalog', { sortKeyFields: ['quizCatalogId'] }),

  // D. 사용자 응답 관련 테이블

  // 12. 사용자 퀴즈 응시 정보
  UserQuiz: a.model({
    userId: a.string().required(),
    courseIdQuizTypeQuizId: a.string().required(),
    courseId: a.string().required(),
    quizId: a.string().required(),
    startTime: a.string(),
    completionTime: a.string(),
    score: a.integer(),
    isPassed: a.boolean(),
    attemptNumber: a.integer(),
    timeSpent: a.integer(),
    status: a.enum(['completed', 'incomplete', 'graded']).required()
  })
  .authorization([a.allow.owner(), a.allow.authenticated(), a.allow.group('admin'), a.allow.group('instructor')])
  .index('byCourseAndUser', { keyFields: ['courseId'], sortKeyFields: ['userId'] })
  .index('byQuizAndCompletionTime', { keyFields: ['quizId'], sortKeyFields: ['completionTime'] }),

  // 13. 사용자 퀴즈 답변
  UserResponse: a.model({
    userIdCourseIdQuizId: a.string().required(),
    questionNumberAttempt: a.string().required(),
    courseId: a.string().required(),
    quizId: a.string().required(),
    questionId: a.string().required(),
    userAnswer: a.json().required(),
    isCorrect: a.string(),
    score: a.integer(),
    timeSpent: a.integer(),
    feedback: a.string()
  })
  .authorization([a.allow.owner(), a.allow.authenticated(), a.allow.group('admin'), a.allow.group('instructor')])
  .index('byQuizAndQuestion', { keyFields: ['quizId'], sortKeyFields: ['questionId'] })
  .index('byCourseAndIsCorrect', { keyFields: ['courseId'], sortKeyFields: ['isCorrect'] }),

  // E. 설문조사 관련 테이블

  // 14. 설문 문항 은행
  SurveyQuestionBank: a.model({
    questionId: a.id(),
    content: a.string().required(),
    questionType: a.enum(['multipleChoice', 'rating', 'openEnded', 'dropdown', 'matrix']).required(),
    options: a.list(a.json()),
    required: a.boolean().default(false),
    tags: a.list(a.string()),
    metadata: a.json(),
    createdAt: a.datetime(),
    updatedAt: a.datetime(),
    createdBy: a.string()
  })
  .authorization([a.allow.authenticated(), a.allow.group('admin')])
  .index('byQuestionType', { sortKeyFields: ['questionType'] })
  .index('byCreator', { sortKeyFields: ['createdBy'] }),

  // 15. 설문조사 카탈로그
  SurveyCatalog: a.model({
    surveyCatalogId: a.id(),
    title: a.string().required(),
    description: a.string(),
    questionItems: a.list(a.json()),
    category: a.string(),
    tags: a.list(a.string()),
    isActive: a.boolean().default(true),
    metadata: a.json(),
    createdAt: a.datetime(),
    updatedAt: a.datetime(),
    createdBy: a.string()
  })
  .authorization([a.allow.authenticated(), a.allow.group('admin')])
  .index('byCategory', { sortKeyFields: ['category'] })
  .index('byCreator', { sortKeyFields: ['createdBy'] }),

  // 16. 코스-설문조사 연결
  CourseSurvey: a.model({
    courseSurveyId: a.id(),
    courseId: a.string().required(),
    surveyCatalogId: a.string().required(),
    title: a.string(),
    description: a.string(),
    startDate: a.string(),
    endDate: a.string(),
    isAnonymous: a.boolean().default(false),
    isActive: a.boolean().default(true),
    createdAt: a.datetime(),
    updatedAt: a.datetime()
  })
  .authorization([a.allow.authenticated(), a.allow.group('admin'), a.allow.group('instructor')])
  .index('byCourse', { sortKeyFields: ['courseId'] })
  .index('bySurveyCatalog', { sortKeyFields: ['surveyCatalogId'] }),

  // 17. 사용자 설문조사 제출
  UserSurvey: a.model({
    randomId: a.string().required(),
    courseIdSurveyTypeSurveyId: a.string().required(),
    courseId: a.string().required(),
    surveyId: a.string().required(),
    surveyType: a.string().required(),
    completionTime: a.string(),
    timeSpent: a.integer(),
    createdAt: a.datetime()
  })
  .authorization([a.allow.authenticated(), a.allow.group('admin'), a.allow.group('instructor')])
  .index('byCourseAndSurveyType', { keyFields: ['courseId'], sortKeyFields: ['surveyType'] })
  .index('bySurveyAndCompletionTime', { keyFields: ['surveyId'], sortKeyFields: ['completionTime'] }),

  // 18. 설문 답변 정보
  UserSurveyResponse: a.model({
    randomIdCourseIdSurveyId: a.string().required(),
    questionNumber: a.string().required(),
    surveyId: a.string().required(),
    courseId: a.string().required(),
    questionId: a.string().required(),
    answer: a.json().required(),
    comments: a.string()
  })
  .authorization([a.allow.authenticated(), a.allow.group('admin'), a.allow.group('instructor')])
  .index('bySurveyAndQuestion', { keyFields: ['surveyId'], sortKeyFields: ['questionNumber'] })
  .index('byCourseAndSurvey', { keyFields: ['courseId'], sortKeyFields: ['surveyId'] }),

  // 19. 설문조사 분석
  SurveyAnalytics: a.model({
    surveyId: a.string().required(),
    courseId: a.string().required(),
    responses: a.integer(),
    avgRating: a.float(),
    questionStats: a.json(),
    updatedAt: a.string().required(),
    wordCloudData: a.json()
  })
  .authorization([a.allow.authenticated(), a.allow.group('admin'), a.allow.group('instructor')])
  .index('byCourseAndUpdatedAt', { keyFields: ['courseId'], sortKeyFields: ['updatedAt'] }),

  // 20. 대시보드 지표
  DashboardMetric: a.model({
    metricType: a.string().required(),
    timeFrameEntityId: a.string().required(),
    entityId: a.string().required(),
    value: a.float().required(),
    previousValue: a.float(),
    changePercentage: a.float(),
    updatedAt: a.string().required(),
    breakdownData: a.json()
  })
  .authorization([a.allow.authenticated(), a.allow.group('admin')])
  .index('byEntityAndMetricType', { keyFields: ['entityId'], sortKeyFields: ['metricType'] })
  .index('byUpdatedAt', { sortKeyFields: ['updatedAt'] })
});

// 데이터 리소스 정의
export const data = defineData({
  schema,
  // 인증 모드 설정
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
    // API 키도 추가로 설정 (일부 퍼블릭 접근용)
    apiKeyAuthorizationMode: {
      expiresInDays: 30
    }
  }
});

// 클라이언트용 타입 내보내기
export type Schema = ClientSchema<typeof schema>;
CRUD 파일 자동 생성 설명
Amplify Gen 2에서는 위의 스키마 파일만 작성하면 다음이 자동으로 생성됩니다:

GraphQL 스키마: 정의한 모델에 따른 GraphQL 타입, 쿼리, 뮤테이션, 구독이 자동 생성됩니다.
DynamoDB 테이블: 각 모델에 대한 DynamoDB 테이블이 자동으로 생성됩니다.
API 리졸버: CRUD 작업을 위한 리졸버가 자동으로 생성됩니다.
클라이언트 코드: 클라이언트에서 사용할 수 있는 타입 정의와 API 연결 코드가 생성됩니다.
스키마 배포 후에는 다음과 같이 클라이언트에서 간단하게 사용할 수 있습니다:

// 클라이언트에서 사용 예시
import { generateClient } from 'aws-amplify/api';
import { Schema } from './amplify/data/resource';

const client = generateClient<Schema>();

// 데이터 조회
const courses = await client.models.Course.list();

// 데이터 생성
const newCourse = await client.models.Course.create({
  courseId: 'course-123',
  startDate: '2023-06-01',
  endDate: '2023-06-30',
  catalogId: 'catalog-456',
  status: 'scheduled'
});

// 데이터 업데이트
await client.models.Course.update({
  id: 'course-123',
  currentAttendees: 15
});

// 데이터 삭제
await client.models.Course.delete({
  id: 'course-123'
});