// The purpose of this service is to receive the translation data and store it in the disk.

use std::{io::Write, time::UNIX_EPOCH};

use actix_web::{App, HttpResponse, HttpServer, Responder};
use serde::{Deserialize, Serialize};
use serde_json::Result;

// fn main() {
//     let data = TranslationData::new(1, 1, 2, "Hello Trans");
//     receive_input(data)
// }

fn write_to_disk(data: TranslationData) {
    let content = serde_json::to_string(&data).unwrap();
    let mut file = std::fs::OpenOptions::new()
        .append(true)
        .open("./db/db.jsonl")
        .unwrap();
    file.write_all(content.as_bytes()).unwrap();
    println!("Write Successful!")
}

#[derive(Debug, Serialize, Deserialize)]
struct TranslationData<'a> {
    id: u64,
    segment_id: u64,
    dst_lang: u64,
    translation: &'a str,
}

impl<'a> TranslationData<'a> {
    fn new(id: u64, segment_id: u64, dst_lang: u64, translation: &'a str) -> Self {
        TranslationData {
            id,
            segment_id,
            dst_lang,
            translation,
        }
    }
}

fn to_struct(data: &str) -> Result<TranslationData> {
    let output: TranslationData = serde_json::from_str(data)?;

    Ok(output)
}

#[actix_web::get("/")]
async fn index_get() -> impl Responder {
    HttpResponse::Ok().body("Welcome to the index page")
}

#[actix_web::post("/")]
async fn index_post(req_body: String) -> impl Responder {
    let cur_timestamp = std::time::SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .expect("Wrong timestamp")
        .as_millis();
    println!("Incoming POST Request at {}", cur_timestamp);

    let data: TranslationData = to_struct(&req_body).unwrap();

    println!("Converted into JSON:\n{:?}", data);

    write_to_disk(data);
    HttpResponse::Ok().body(req_body)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| App::new().service(index_get).service(index_post))
        .bind(("localhost", 8080))?
        .run()
        .await
}
