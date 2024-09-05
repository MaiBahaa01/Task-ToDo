namespace TodoApi.DTOs
{
    public class TodoReadDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public bool Completed { get; set; }
        public int? UserId { get; set; }
    }
}
