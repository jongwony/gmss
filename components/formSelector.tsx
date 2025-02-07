export function fetchOnlySelectedData() {
    const mbtiSelected = document.getElementById('mbtiSelected')
    const mbtiElements = mbtiSelected.getElementsByTagName('button')
    let mbti = Array.from(mbtiElements).map(x => x.innerText)
    return {
        'mbti': mbti,
    }
}

export function fetchFormData() {
    const mbtiSelected = document.getElementById('mbtiSelected')
    const personnelElement = document.getElementById('personnel') as HTMLInputElement
    const mbtiElements = mbtiSelected.getElementsByTagName('button')
    let mbti = Array.from(mbtiElements).map(x => x.innerText)
    let personnel = parseInt(personnelElement.value)
    return {
        'mbti': mbti,
        'personnel': personnel,
    }
}