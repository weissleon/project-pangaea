use actix_cors::Cors;
use actix_web::{web, App, HttpServer};
mod token_manager;

#[derive(serde::Serialize, serde::Deserialize, Debug)]
struct AuthBundle {
    account: String,
    password: String,
}

const ACCOUNTS: &[&[&'static str; 2]] = &[&["chodenis", "1234"], &["chodana", "1234"]];

#[actix_web::post("/authenticate")]
async fn authenticate(payload: web::Json<AuthBundle>) -> web::Json<AuthBundle> {
    let data = payload.into_inner();
    println!("{:?}", data);

    token_manager::issue_access_token(&data.account);

    // manual account password checking

    let mut is_verified: bool = false;
    for account in ACCOUNTS.iter() {
        if account[0] == data.account && account[1] == data.password {
            is_verified = true;
            break;
        }
    }

    match is_verified {
        true => web::Json(data),
        false => web::Json(AuthBundle {
            account: "nope".to_string(),
            password: "nope".to_string(),
        }),
    }
}

#[derive(serde::Deserialize, serde::Serialize)]
struct RegisterResult {
    is_successful: bool,
}

#[derive(serde::Deserialize, serde::Serialize)]
struct RegisterPayload {
    email: String,
    password: String,
}

#[actix_web::post("/register")]
async fn register(payload: web::Json<RegisterPayload>) -> web::Json<RegisterResult> {
    let account_list: Vec<&str> = vec!["chodenis", "chodana"];

    let mut result: RegisterResult = RegisterResult {
        is_successful: true,
    };

    // ! Dummy implementation. Will be changed.
    match account_list.contains(&payload.email.as_str()) {
        true => result.is_successful = false,
        false => {}
    }

    web::Json(result)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        let cors = Cors::default()
            .allow_any_origin()
            .allow_any_method()
            .allow_any_header()
            .send_wildcard();

        App::new()
            .wrap(cors)
            .service(authenticate)
            .service(register)
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
