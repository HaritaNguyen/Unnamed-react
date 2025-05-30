import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_KEY)

export const send2FTEmail = async ( email : string, token : string ) => {
    await resend.emails.send({
        from : "onboarding@resend.dev",
        to: email,
        subject: "Get 2FA code",
        html: `<p>Your 2FA code is : <strong>${token}</strong>`
    })
}

export const sendResetPasswordEmail = async ( email : string, token : string ) => {
    const confirmLink = `http://localhost:3000/new-password?token=${token}`;

    await resend.emails.send({
        from : "onboarding@resend.dev",
        to: email,
        subject: "Confirm your email",
        html: `<p>Click this <a href="${confirmLink}">here</a> to reset the password.`
    })
}

export const sendVerificationEmail = async ( email : string, token : string ) => {
    const confirmLink = `http://localhost:3000/new-verification?token=${token}`;

    await resend.emails.send({
        from : "onboarding@resend.dev",
        to: email,
        subject: "Confirm your email",
        html: `<p>Click this <a href="${confirmLink}">here</a> to confirm email.`
    })
}