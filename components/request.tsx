const base_url = 'https://9e240d7v0k.execute-api.ap-northeast-2.amazonaws.com/api'

export const postSynergy = async (mbti: string[]) => {
    const synergy_path = base_url + '/mbti/synergy'
    const response = await fetch(synergy_path, {
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ 'mbti': mbti }),
        method: 'POST',
        mode: "cors",
    })
    return response.json()
}

export const postRecommend = async (mbti: string[], personnel: number) => {
    const recommend_path = base_url + '/mbti/recommend'
    const response = await fetch(recommend_path, {
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ 'mbti': mbti, 'personnel': personnel }),
        method: 'POST',
        mode: "cors",
    })
    return response.json()
}

export const postGrouper = async (mbti: string[], personnel: number) => {
    const grouper_path = base_url + '/mbti/grouper'
    const response = await fetch(grouper_path, {
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ 'mbti': mbti, 'personnel': personnel }),
        method: 'POST',
        mode: "cors",
    })
    return response.json()
}