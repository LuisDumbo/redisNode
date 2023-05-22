import express from "express";
import * as Yup from 'yup'
import send_email from "./send_email";

const App = express();
const PORT = 3005

App.use(express.json())

App.post('/sign_up', async (req, res) => {

    const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().required()
    })

    if (!(await schema.isValid(req.body))) {

        return res.status(400).json({ erro: 'Falha na Validação' })

    }

    const { name, email, password } = req.body

    await send_email.send({ name, email, password })

    return res.status(201 ).json({ Created: 'User Criado' })
})

App.listen(PORT, () => {
    console.log(`servidor ligado na porta ${PORT}`)
})