﻿namespace TodoApi.DTOs
{
    public class TodoCreateOrUpdateDto
    {
        public string Title { get; set; }
        public bool Completed { get; set; }
        public int? UserId { get; set; }
    }
}
