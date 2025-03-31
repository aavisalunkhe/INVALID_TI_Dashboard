import axios from 'axios';

const API_URL= '/api';
//ax instance
const pai= axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
//game data
export const getGames= async()=> {
    try{
        const response= await api.get('/games');
        return response.data;
    }catch(error){
        console.error('Error fetching games: ', error);
        throw error;
    }
};
export const getGameById= async(gameId)=>{
    try{
        const response= await api.get(`/games/${gameId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching game ${gameId}:`, error);
    throw error;
  }
};
//player data
export const getPlayers= async()=> {
    try{
        const response= await api.get('/players');
        return response.data;
    }catch(error){
        console.error('Error fetching players: ', error);
        throw error;
    }
};
export const getPlayerById= async(playerId)=>{
    try{
        const response= await api.get(`/players/${playerId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching game ${playerId}:`, error);
        throw error;
    }
};
//team data
export const getTeams= async()=> {
    try{
        const response= await api.get('/teams');
        return response.data;
    }catch(error){
        console.error('Error fetching teams: ', error);
        throw error;
    }
};
export const getTeamById= async(teamId)=>{
    try{
        const response= await api.get(`/teams/${teamId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching game ${teamId}:`, error);
        throw error;
    }
};
//stats data
export const getPitchingStats= async(gameId)=> {
    try{
        const response= await api.get(`/stats/pitching/${gameId}`);
        return response.data;
    }catch(error){
        console.error('Error fetching pitching stats: ', error);
        throw error;
    }
};
export const getHittingStats= async(gameId)=> {
    try{
        const response= await api.get(`/stats/hitting/${gameId}`);
        return response.data;
    }catch(error){
        console.error('Error fetching hitting stats: ', error);
        throw error;
    }
};
export const getDefensiveStats= async(gameId)=> {
    try{
        const response= await api.get(`/stats/defensive/${gameId}`);
        return response.data;
    }catch(error){
        console.error('Error fetching defensive stats: ', error);
        throw error;
    }
};
export const getTrendsStats= async(gameId)=> {
    try{
        const response= await api.get(`/stats/trends/${gameId}`);
        return response.data;
    }catch(error){
        console.error('Error fetching trends stats: ', error);
        throw error;
    }
};
