use input::{InputState, background, sendkey};
use rocket::{fs::{relative, FileServer}, routes};

mod input;

#[tokio::main]
async fn main() {
    let state = InputState::default();

    tokio::spawn(background(state.clone()));

    rocket::build()
        .mount("/api", routes![sendkey])
        .mount("/", FileServer::from(relative!("static")))
        .manage(state)
        .launch()
        .await
        .unwrap();
}
