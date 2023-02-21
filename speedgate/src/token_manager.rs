use jsonwebtoken::{self, EncodingKey};

const SECRET_TEXT: &[u8] = b"myscretsauce";

#[derive(serde::Serialize, serde::Deserialize)]
struct AccountTokenClaim<'a> {
    name: &'a str,
}

pub fn issue_access_token(account: &str) {
    let claims = AccountTokenClaim { name: account };

    let token = jsonwebtoken::encode(
        &jsonwebtoken::Header::default(),
        &claims,
        &EncodingKey::from_secret(SECRET_TEXT),
    )
    .expect("Oops");

    println!("{:?}", token)
}
