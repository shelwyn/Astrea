
from fastapi import FastAPI, HTTPException, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
import PIL
import json

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow requests from any origin
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],  # Allow all headers
)


gemini_key = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key = gemini_key)

@app.post("/image")
async def upload_image(userInput: str = Form(...), image: UploadFile = File(...)):
    print("User Input:", userInput)
    model = genai.GenerativeModel('gemini-pro-vision')
    file_path = f"uploads/{image.filename}"
    with open(file_path, "wb") as f:
        f.write(image.file.read())
    img = PIL.Image.open(file_path)
    response = model.generate_content(
    [userInput, img]
    )
    image_response=response.text
    return {"message": "success", "response": image_response}

@app.post("/chat")
async def process_chat(payload: dict):
    try:
        print(payload)
        model = genai.GenerativeModel('gemini-pro')
        answer = payload["answer"]
        chat = model.start_chat(history=[
                {
                        'role': 'user',
                        'parts':['describe this image in a few lines"']
                },
                {       'role': 'model',
                        'parts': [answer],
                },
                ])

        user_message = payload["msg"]
        response = chat.send_message(user_message)
        result = response.text
        #data = json.loads(response)
        #print(data)
        #for message in chat.history:
             #print(f'**{message.role}**: {message.parts[0].text}')
        return result
    except Exception as e:
        print(e)
        #raise HTTPException(status_code=500, detail=str(e))

