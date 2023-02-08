use actix_web::{web, App, HttpResponse, HttpServer};

#[derive(serde::Serialize, serde::Deserialize, Debug)]
struct AuthBundle {
    username: String,
    password: String,
}

#[actix_web::post("/authenticate")]
async fn authenticate(payload: web::Json<AuthBundle>) -> HttpResponse {
    let data = payload.into_inner();
    println!("{:?}", data);
    HttpResponse::Ok().body("Welcome to Authentication endpoint")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| App::new().service(authenticate))
        .bind(("127.0.0.1", 8080))?
        .run()
        .await
}
