using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using TodoApi.DTOs;

namespace TodoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    // Controller for interacting with live Todo data from an external API.
    public class LiveTodoController : ControllerBase
    {
        private readonly HttpClient _httpClient;

        public LiveTodoController(IHttpClientFactory httpClientFactory)
        {
            _httpClient = httpClientFactory.CreateClient();
        }
        // Retrieves live Todo items from an external API with pagination
        [HttpGet]
        public async Task<IActionResult> GetLiveTodos(int pageNumber = 1, int pageSize = 10)
        {
            var response = await _httpClient.GetAsync("https://jsonplaceholder.typicode.com/todos");
            if (!response.IsSuccessStatusCode)
                return StatusCode((int)response.StatusCode, response.ReasonPhrase);

            var json = await response.Content.ReadAsStringAsync();
            var todos = JsonConvert.DeserializeObject<List<TodoReadDto>>(json);

            // Pagination logic
            var totalItems = todos.Count;
            var items = todos.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

            var paginationMetadata = new
            {
                totalItems,
                pageNumber,
                pageSize,
                totalPages = (int)Math.Ceiling(totalItems / (double)pageSize),
                items
            };

            return Ok(paginationMetadata);
        }
        // Retrieves live Todo items from an external API
        //[HttpGet]
        //public async Task<IActionResult> GetLiveTodos()
        //{
        //    var response = await _httpClient.GetAsync("https://jsonplaceholder.typicode.com/todos");
        //    if (!response.IsSuccessStatusCode)
        //        return StatusCode((int)response.StatusCode, response.ReasonPhrase);

        //    var todos = await response.Content.ReadAsStringAsync();
        //    return Ok(todos);
        //}
    }
}
