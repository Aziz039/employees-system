export const BASE_URL = {
	LOCAL: "http://localhost:2030/api/",
	DEV: "",
	PREPROD: "",
	PROD: "",
};

export const environmentURL = BASE_URL.LOCAL;

const APP_CONSTANTS = {
	APP_NAME: "Alra2edoon System",
	CONFIG: {
		API_KEY: {
			WEB: "AbdulazizApiSecretKey",
		},
		APIs: {
			AUTH: {
				LOGIN: environmentURL + "auth/login"
			},
			CMS: {
				GET_ALL_CUSTOMERS: environmentURL + "cms/user_customers",
				GET_CUSTOMER: environmentURL + "cms/user_customers/",
				MODIFY_CUSTOMER: environmentURL + "cms/user_customers",
			},
			USERS:{
				GET_ALL_USERS: environmentURL + "users",
				GET_USER: environmentURL + "users",
			}
		},
		CONTENT_TYPE: "application/json",
		LANGUAGE: {
			ARABIC: "ar",
			ENGLISH: "en",
		},
		sessionStorage: {
			LANGUAGE: "LANGUAGE",
			USER: "USER",
			TOKEN: "TOKEN",
			isLogged: "isLogged",
			targetedCustomerId: "targetedCustomerId",
			ROLE: "role"
		},
	}, 
};

export const allCols = ['id', 'customerName', 'nationalID', 'cost', 'discount', 'costAfterDiscount', 
        'lastBillDate', 'firstBillDate', 'phone1', 'phone2', 'phone3', 'phone4', 'phone5', 'phone6',
         'phone7', 'phone8', 'collecterUsername', 'attributionDate', 'status', 'notes', 'paymentDate',
          'newStatus', 'newNotes', 'newPaymentDate', 'customerStatus', 'timestamp' ]; 

export const statusOptions = ['PTP', 'CB', 'RJCT', 'NA', 'TO', 'WN', 'NC', 'OTHER'];
export const allNotes = [
	['السداد اليوم', 'السداد خلال يومين', 'السداد خلال أسبوع', 'السداد خلال أسبوعين', 'السداد خلال الشهر', 'السداد مع الراتب', 'السداد بداية الشهر الجاي', 'السداد بعد شهرين', 'خارج المملكة لمن يرجع يسدد'],
	['مشغول', 'بيراجع الفرع', 'بيراجع معترض على المبالغ', 'كلمينى بعد ساعة', 'كلمينى الصباح', 'كلمينى الظهر', 'كلمينى مساء', 'اب - ام  - اخ - اخت -  أقارب درجة أولى  سوف يتم تبليغ العميل', 
	'رقم العميل وليس موجود الان', 'العميل افاد بالسداد اتاكد من السداد', 'خارج المملكة لمن يرجع  يراجع', 'انا اجيب التفاصيل', 'العميل متوفى او مسافر وراح يسدد عنه'],
	['بعد ماسمع زين قفل', 'معترض ومايبغاء يسدد' ],
	['الو وقفل', 'مايتكلم', 'الصوت غير واضح', 'اجنبي لايتحدث العربية', 'مشكلة شبكة', 'يعرف العميل']];



export const userToken = sessionStorage.getItem(
	APP_CONSTANTS.CONFIG.sessionStorage.TOKEN
);

export const config = {
	headers: {
		"content-type": APP_CONSTANTS.CONFIG.CONTENT_TYPE,
		user_token: "Bearer " + userToken,
		api_key: APP_CONSTANTS.CONFIG.API_KEY.WEB,
	},
};

export default APP_CONSTANTS;