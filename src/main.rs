use input::{InputState, background, sendkey};
use rocket::{launch, routes};

mod input;

#[tokio::main]
async fn main() {
    let state = InputState::default();

    tokio::spawn(background(state.clone()));

    rocket::build()
        .mount("/", routes![sendkey])
        .manage(state)
        .launch()
        .await
        .unwrap();
}
