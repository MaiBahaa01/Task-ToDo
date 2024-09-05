using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TodoApi.DTOs;
using TodoApi.Model;
using TodoApi.UnitOfWork;

namespace TodoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ToDoController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ToDoController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        // Retrieves all Todo items.

        [HttpGet]
        public async Task<IActionResult> GetTodos()
        {
            var todos = await _unitOfWork.Todos.GetAllTodosAsync();
            var todoDtos = _mapper.Map<IEnumerable<TodoReadDto>>(todos);
            return Ok(todoDtos);
        }
        // Retrieves a Todo item by its ID.

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTodoById(int id)
        {
            var todo = await _unitOfWork.Todos.GetTodoByIdAsync(id);
            if (todo == null) 
                return NotFound();

            var todoDto = _mapper.Map<TodoReadDto>(todo);
            return Ok(todoDto);
        }
        // Creates a new Todo item.
        [HttpPost]
        public async Task<IActionResult> CreateTodo([FromBody] TodoCreateOrUpdateDto todoDto)
        {
            if (!ModelState.IsValid) 
                return BadRequest(ModelState);

            var todo = _mapper.Map<Todo>(todoDto);
            await _unitOfWork.Todos.AddTodoAsync(todo);
            await _unitOfWork.SaveAsync();

            return CreatedAtAction(nameof(GetTodoById), new { id = todo.Id }, todo);
        }
        // Updates an existing Todo item.
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTodo(int id, [FromBody] TodoCreateOrUpdateDto todoDto)
        {
            if (!ModelState.IsValid) 
                return BadRequest(ModelState);

            var todo = await _unitOfWork.Todos.GetTodoByIdAsync(id);
            if (todo == null) 
                return NotFound();

            _mapper.Map(todoDto, todo);
            _unitOfWork.Todos.UpdateTodo(todo);
            await _unitOfWork.SaveAsync();
            var updatedTodoDto = _mapper.Map<TodoReadDto>(todo);
            return Ok(updatedTodoDto);
        }
        // Partially updates a Todo item.
        [HttpPatch("{id}")]
        public async Task<IActionResult> PatchTodo(int id, [FromBody] TodoUpdatePatchDto todoUpdatepatchDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var todo = await _unitOfWork.Todos.GetTodoByIdAsync(id);
            if (todo == null)
                return NotFound();

            // Apply updates from DTO to entity
            _mapper.Map(todoUpdatepatchDto, todo);
            _unitOfWork.Todos.UpdateTodo(todo);
            await _unitOfWork.SaveAsync();

            var updatedTodoDto = _mapper.Map<TodoReadDto>(todo);
            return Ok(updatedTodoDto);
        }

        // Deletes a Todo item by its ID.
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodo(int id)
        {
            var todo = await _unitOfWork.Todos.GetTodoByIdAsync(id);
            if (todo == null) 
                return NotFound();
            var deletedTodoDto = _mapper.Map<TodoReadDto>(todo);
            _unitOfWork.Todos.DeleteTodo(todo);
            await _unitOfWork.SaveAsync();

            return Ok(deletedTodoDto);
        }
    }
}
